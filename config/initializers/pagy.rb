require 'pagy/extras/metadata'

Pagy::DEFAULT[:limit] = 25
Pagy::DEFAULT[:metadata] = %i[page prev next last count pages limit]