from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_mail import Mail, Message
from flask_cors import CORS
import os
import bcrypt

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))  # application path
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'food.db')
app.config['JWT_SECRET_KEY'] = 'super-secret'  # not secure
app.config['MAIL_PORT'] = '25100'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # silence the warning messages

# initializations
db = SQLAlchemy(app)   # Because order matters, SQLAlchemy must be initialized before Marshmallow.
ma = Marshmallow(app)
jwt = JWTManager(app)
mail = Mail(app)
bcrypt = Bcrypt(app)
cors = CORS()


# Flask CLI commands
@app.cli.command('db_create')
def db_create():
    db.create_all()
    print('Database created successfully')


@app.cli.command('db_drop')
def db_drop():
    db.drop_all()
    print('Database destroyed successfully')


@app.cli.command('db_seed')
def db_seed():
    eggs = Food(food_name='Eggs',
                meal_category='Breakfast',
                image='https://images.unsplash.com/photo-1612878010854-1250dfc5000a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                quantity=12)

    cereal = Food(food_name='Honey Bunches of Oats',
                  meal_category='Breakfast',
                  image='',
                  quantity=5)

    french_toast = Food(food_name='French Toast Sticks',
                        meal_category='Breakfast',
                        image='null',
                        quantity=2)
    db.session.add(eggs)
    db.session.add(cereal)
    db.session.add(french_toast)

    test_user = User(first_name='Iyanna',
                     last_name='Bell',
                     email='iyanna.bell@verizon.com',
                     password='P@ssw0rd')

    db.session.add(test_user)
    db.session.commit()
    print('Database seeded successfully')


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/food')
def my_pantry():
    return jsonify(message='List foods here'), 200


@app.route('/food/breakfast')
def not_found():
    return jsonify(message='That resource has not been created yet'), 404


# not RESTful
@app.route('/parameters')
def parameters():
    name = request.args.get('name')
    age = int(request.args.get('age'))
    if age < 18:
        return jsonify(message=f'Sorry {name} you are not old enough'), 401
    # example: http://localhost:5000/parameters?name=Tank&age=14
    else:
        return jsonify(message=f'Welcome {name}'), 200


# RESTful
@app.route('/clean_urls/<string:name>/<int:age>')  # flask functions to make url params clean
def clean_urls(name: str, age: int):
    if age < 18:
        return jsonify(message=f'Sorry {name} you are not old enough'), 401
    # example: http://localhost:5000/clean_urls/Yanna/27
    else:
        return jsonify(message=f'Welcome {name}'), 200


@app.route('/foodies', methods=['GET'])
def foodies():
    food_list = Food.query.all()
    result = foods_schema.dump(food_list)  # deserialize with Marshmallow
    return jsonify(result)


@app.route('/registration', methods=['POST'])
def register():
    email = request.form['email']
    test_uniqueness = User.query.filter_by(
        email=email).first()  # calls the db to look for User with email that was passed in
    if test_uniqueness:
        return jsonify(message='That email already exists.'), 409  # record conflict
    else:
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        password = request.form['password']

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify(message="User created successfully."), 201  # new record added


@app.route('/login', methods=['GET', 'POST'])  # can be GET
def log_in():
    if request.is_json:
        email = request.json['email']
        password = request.json['password']
    else:
        email = request.form['email']
        password = request.form['password']

    test_authenticity = User.query.filter_by(email=email).first()
    if test_authenticity and bcrypt.check_password_hash(test_authenticity.password, password):
        access_token = create_access_token(identity=email)
        return jsonify(message="Login successful!", access_token=access_token), 200
    else:
        return jsonify(message=f"Incorrect email or password {password} and {User.password}"), 401  # permission denied


@app.route('/forgot_password/<string:email>', methods=['GET'])
def retrieve_password(email: str):
    user_email = User.query.filter_by(email=email).first()  # get the first instance of this email
    if user_email:
        msg = Message(subject='Your Foodie account access request',
                      sender='admin@foodbandits.com',
                      recipients=[email],
                      body=f'Your Foodie API password is {user_email.password}'
                      )
        # msg.html = render_template('emails/your_template.html')
        mail.send(msg)
        return jsonify(message=f'Your password has been sent to {email}')
    else:
        return jsonify(message='That email does not match our records, please Sign Up')


@app.route('/food_details/<int:food_id>', methods=['GET'])
def food_details(food_id: int):
    food = Food.query.filter_by(food_id=food_id).first()
    if food:
        result = food_schema.dump(food)
        return jsonify(result)
    else:
        return jsonify(message="Food item does not exist"), 404


@app.route('/new_food', methods=['POST'])
@jwt_required()
def add_food():
    food_name = request.form['food_name']
    find_if_exists = Food.query.filter_by(food_name=food_name).first()
    if find_if_exists:
        return jsonify("There is already a food item by that name. Please update the existing one"), 409
    else:
        image = request.form['image']
        meal_category = request.form['meal_category']
        quantity = int(request.form['quantity'])

        new_food = Food(food_name=food_name,
                        image=image,
                        meal_category=meal_category,
                        quantity=quantity)

        db.session.add(new_food)
        db.session.commit()
        return jsonify(message="Food item added successfully"), 201


@app.route('/update_food', methods=['PUT'])
@jwt_required()
def update_food():
    food_id = int(request.form['food_id'])
    food = Food.query.filter_by(food_id=food_id).first()
    if food:
        food.food_name = request.form['food_name']
        food.image = request.form['image']
        food.meal_category = request.form['meal_category']
        food.quantity = request.form['quantity']

        db.session.commit()
        return jsonify(message="Food item updated successfully"), 202
    else:
        return jsonify(message="Food item not found"), 404


@app.route('/destroy/<int:food_id>', methods=['DELETE'])
@jwt_required()
def remove_food(food_id: int):
    food = Food.query.filter_by(food_id=food_id).first()  # return first matching record
    if food:
        db.session.delete(food)
        db.session.commit()
        return jsonify(message="Food item deleted successfully"), 202
    else:
        return jsonify(message="Food item not found, destruction aborted"), 404


# database models
class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)


class Food(db.Model):
    __tablename__ = 'food'
    food_id = Column(Integer, primary_key=True)
    food_name = Column(String)
    image = Column(String)
    meal_category = Column(String)
    quantity = Column(Integer)


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'first_name', 'last_name', 'email', 'password')


class FoodSchema(ma.Schema):
    class Meta:
        fields = ('food_id', 'food_name', 'image', 'meal_category', 'quantity')


user_schema = UserSchema()  # instantiate the user object and the schema
users_schema = UserSchema(many=True)

food_schema = FoodSchema()
foods_schema = FoodSchema(many=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
