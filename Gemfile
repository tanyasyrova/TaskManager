source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '>=2.7.1'

gem 'rails', '~> 6.1.6'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'jbuilder', '~> 2.7'
gem 'bootsnap', '>= 1.4.4', require: false
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'bcrypt', '~> 3.1.7'
gem 'simple_form'
gem 'state_machines', '0.5.0'
gem 'state_machines-activerecord', '0.8.0'
gem 'slim-rails'
gem 'kaminari'
gem 'ransack', '3.2.1'
gem 'responders'
gem 'active_model_serializers'
gem 'js-routes'
gem 'webpacker-react', '~> 1.0.0.beta.1'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'
gem 'concurrent-ruby', '1.3.4'
# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb


group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'factory_bot_rails', '~> 6.2.0'
  gem 'rubocop'
end

group :development do
  gem 'web-console', '>= 4.1.0'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'listen', '~> 3.3'
  gem 'bullet'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver', '>= 4.0.0.rc1'
  gem 'webdrivers'
  gem 'simplecov', require: false
  gem 'simplecov-lcov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
