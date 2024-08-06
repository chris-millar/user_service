require 'pagy/extras/metadata'

Pagy::DEFAULT[:limit] = 2
Pagy::DEFAULT[:metadata] = %i[page prev next last]