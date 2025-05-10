✅ Example usage in controller
```typescript
import { Request, Response } from 'express';
import { getAllUsers } from '../services/user.service';
import { sendResponse } from '../utils/sendResponse';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
};
```
✅ Sample Output (from API)
```typescript
{
  "success": true,
  "statusCode": 200,
  "message": "Users retrieved successfully",
  "data": [
    {
      "_id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```