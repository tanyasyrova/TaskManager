# frozen_string_literal: true

require 'js-routes'

namespace :js_routes do
  desc 'Generate js routes for webpack'
  task generate: :environment do
    ROUTES_DIR = Rails.root.join('app', 'javascript', 'routes')
    FileUtils.mkdir_p(ROUTES_DIR)
    file_name = ROUTES_DIR.join('ApiRoutes.js')
    JsRoutes.generate!(file_name, camel_case: true)
  end
end
