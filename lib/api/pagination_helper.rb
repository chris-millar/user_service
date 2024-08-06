class Api::PaginationHelper
  def self.limit
    Pagy::DEFAULT[:limit]
  end
end