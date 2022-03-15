import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 2,
            maxlength:20
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required:true
        },
        role: {
            type: String,
            required: true
        },
        state: {
            typed: Number,
            default: 0 // here the number means active
        },
        userCode: {
            type: String,
          
        }
    }
)

const User = mongoose.model('User', userSchema);


const CreateNewUser = (props) => {
    User.create({
        username: props.username,
        email: props.email,
        password: props.password,
        state: props.state,
        role: props.role
    })

}

const EditUser = async(props) => {
    await User.updateOne({ '_id': props.id }, {$set:{
        username: props.username,
        email: props.email,
        role: props.role,
        '__v': props.state
    }

    })
}

const DelUser = async (props) => {
    await User.findOneAndDelete({'_id': props.id})
}

const UserInsertBulk = async () => {
    await User.insertMany([
      {
        username: "zhang0",
        email: "zhang0@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang1@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang2@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang3@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang4@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang5@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang6@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang7@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang8@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang9@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang10@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang11@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang12@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang13@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang14@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang15@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang16@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
      {
        username: "zhang0",
        email: "zhang17@gmail.com",
        password: 123456,
        state: 0,
        role: "admin",
      },
    ])
}
// UserInsertBulk()

// here, export users id
const allUser = await User.find({});
const userIdExport = () => {
  const userListArray = [];
  allUser.map(item => {
    userListArray.push(item['_id'])
  });
  return (userListArray)
}

// userIdExport();
// console.log(userIdExport());
export {User, CreateNewUser, EditUser,DelUser, UserInsertBulk, userIdExport}