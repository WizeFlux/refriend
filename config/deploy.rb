set :application, "refriend"
server '162.209.3.119', :app, :web, :db

set :user, 'deploy'
set :use_sudo, false
set :deploy_to, "/home/deploy/applications/refriend"

require 'bundler/capistrano'
require 'rvm/capistrano'
require 'capistrano-unicorn'

load 'deploy/assets'

set :rvm_path, "/home/deploy/.rvm"
set :rvm_ruby_string, 'ruby-2.0.0-p195@global'
set :rvm_type, :user

set :scm, :git
set :shared_children, %w(log tmp/pids tmp/sock)
set :repository, "git@github.com:WizeFlux/refriend.git"

set :branch, 'master'
set :rails_env, 'production'
set :unicorn_env, rails_env
