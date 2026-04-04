import uuid

# Unique process lifetime identifier used to detect backend restarts.
SERVER_INSTANCE_ID = str(uuid.uuid4())
