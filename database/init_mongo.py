from pymongo import MongoClient

def initialize_db():
    client = MongoClient('mongodb+srv://manahilmano2002:helloworld@cluster0.nconi13.mongodb.net/')
    db = client['userData']  # Change 'userData' to your desired database name

    # Create a collection and add some initial data
    users_collection = db['users']
    
    # Check if the collection is empty
#    if users_collection.count_documents({}) == 0:
        # Insert initial user data if needed, including email
 #       users_collection.insert_many([
  #          {
   #             "username": "admin", 
    #            "password": "admin",  # Use hashed passwords in production!
     #           "email": "admin@example.com"  # Add the email field
      #      }
       # ])
      #  print("Initial data inserted.")

    client.close()

if __name__ == "__main__":
    initialize_db()

