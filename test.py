import mysql.connector

# Establish the connection
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="bokuram@2005",
    database="new_db"
)

# Create a cursor object
cursor = connection.cursor()

# Number of rows to insert
num_rows_driver_conductor = 25179
num_rows_bus = 8393

# Create Driver_1 table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Driver_1 (
        DriverID INT PRIMARY KEY
    )
''')

# Create Conductor_1 table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Conductor_1 (
        ConductorID INT PRIMARY KEY
    )
''')

# Create Bus table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Bus (
        BusID INT PRIMARY KEY
    )
''')

# Insert data into Driver_1 table
driver_data = [(i,) for i in range(1, num_rows_driver_conductor + 1)]
cursor.executemany('''
    INSERT INTO Driver_1 (DriverID)
    VALUES (%s)
''', driver_data)

# Insert data into Conductor_1 table
conductor_data = [(i,) for i in range(1, num_rows_driver_conductor + 1)]
cursor.executemany('''
    INSERT INTO Conductor_1 (ConductorID)
    VALUES (%s)
''', conductor_data)

# Insert data into Bus table
bus_data = [(i,) for i in range(1, num_rows_bus + 1)]
cursor.executemany('''
    INSERT INTO Bus (BusID)
    VALUES (%s)
''', bus_data)

# Commit the changes
connection.commit()

# Close the cursor and connection
cursor.close()
connection.close()