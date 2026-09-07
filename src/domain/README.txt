The Domain Layer is the core of the application. Here there are the DTO, the DAO and everything needed to communicate with the database and manage errors from it.
The data types are NOT @Entity, but types similar to @Entity to be used in superior layers in interfaces. This is done to abstract the controller, in the Infrastructure Layer,
from the ORM used, in order to be easily replaceable.

Technically, every superior layer can reference anything in the inferior layers, not bound strictly to communication one-on-one with the inmediately inferior layer.