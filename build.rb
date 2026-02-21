#!/usr/bin/env ruby
# frozen_string_literal: true

# Generates _manifest.json for blogs/ and posts/ collections.
# Run after adding, editing, or removing any blog or post .md file.
#
# Usage: ruby build.rb
# Requirements: Ruby 2.7+ (uses built-in yaml and json, no gems needed)

require 'json'
require 'yaml'

COLLECTIONS = %w[pages/blogs pages/posts].freeze

def main
  puts 'Building manifests...'
  puts

  COLLECTIONS.each do |dir|
    if Dir.exist?(dir)
      puts "Scanning #{dir}/"
      generate_manifest(dir)
    else
      puts "Skipping #{dir}/ (directory not found)"
    end

    puts
  end

  puts 'Done!'
end

def generate_manifest(dir)
  output_path = File.join(dir, '_manifest.json')
  entries = {} # slug => { langs: { "en" => {...}, "ar" => {...} } }

  Dir.glob(File.join(dir, '*.*.md')).each do |filepath|
    result = extract_slug_and_lang(filepath)
    next unless result

    slug, lang = result
    meta = parse_front_matter(filepath)

    unless meta['title'] && meta['date']
      warn "  ⚠ Skipping #{filepath}: missing required 'title' or 'date' in front matter"
      next
    end

    entries[slug] ||= { 'slug' => slug, 'langs' => {} }
    entries[slug]['langs'][lang] = {
      'title'   => meta['title'].to_s,
      'date'    => meta['date'].to_s,
      'excerpt' => (meta['excerpt'] || '').to_s,
      'tags'    => meta['tags'].is_a?(Array) ? meta['tags'].map(&:to_s) : nil,
      'cover'   => meta['cover']&.to_s
    }
  end

  sorted = entries.values.sort_by do |entry|
    date_str = entry['langs'].values.first&.dig('date') || '0000-00-00'
    date_str
  end.reverse

  File.write(output_path, JSON.pretty_generate({ 'entries' => sorted }))
  puts "  ✓ Generated #{output_path} (#{sorted.length} entries)"
end

def extract_slug_and_lang(filename)
  basename = File.basename(filename, '.md')
  parts = basename.rpartition('.')
  return nil if parts[1].empty?

  slug = parts[0]
  lang = parts[2]
  return nil unless %w[ar en].include?(lang)

  [slug, lang]
end

def parse_front_matter(filepath)
  content = File.read(filepath, encoding: 'utf-8')
  return {} unless content.start_with?('---')

  parts = content.split(/^---\s*$/, 3)
  return {} if parts.length < 3

  YAML.safe_load(parts[1], permitted_classes: [Date]) || {}
rescue Psych::SyntaxError => e
  warn "  ⚠ YAML error in #{filepath}: #{e.message}"
  {}
end

main
