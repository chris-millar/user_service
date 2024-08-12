class UserSerializer < ActiveModel::Serializer
  attributes :id, :filename, :record_count, :status, :performed_at

  def performed_at
    object.performed_at.iso8601
  end
end
