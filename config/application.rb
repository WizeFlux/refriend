require File.expand_path('../boot', __FILE__)

require "action_controller/railtie"
require "action_mailer/railtie"
require "rails/test_unit/railtie"
require "sprockets/railtie"

Bundler.require(:default, Rails.env)

module Refriend
  class Application < Rails::Application
    config.eager_load_paths += ["#{config.root}/lib"]
    config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
  end
end
