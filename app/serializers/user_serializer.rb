class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :profession, :country, :city, :date_created, :date_updated, :import_id

  def date_created
    object.created_at.iso8601
  end

  def date_updated
    object.updated_at.iso8601
  end
end
