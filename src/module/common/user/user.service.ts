let users = [
    {
        id: 1,
        name: "John Doe",
    },
    {
        id: 2,
        name: "Jane Doe",
    },
    {
        id: 3,
        name: "John Smith",
    },
    {
        id: 4,
        name: "Jane Smith",
    },
    {
        id: 5,
        name: "John Doe",
    }
]

const getAllUsers = async () => {
    return users;
}

export const userService = {
    getAllUsers
}