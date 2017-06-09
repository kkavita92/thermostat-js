require 'sinatra'
require 'json'

set :public_folder, proc { File.join(root) }

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/time' do
  { time: Time.now.to_s, city: "London"}.to_json
end

post '/temperature' do
  File.open("weatherData.json", "w") do |data|
    data.write params[:temperature]
    end
end

get '/temperature' do
  hash = {temperature: nil}
  File.open("weatherData.json", "r") do |data|
    hash[:temperature] = data
  end
   p hash[:temperature]
end
