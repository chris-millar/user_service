module JsonSpecHelper
  def response_json
    @response_json ||= JSON.parse(response.body).deep_symbolize_keys
  end

  def api_headers
    @api_headers ||= { "ACCEPT" => "application/json" }
  end
end