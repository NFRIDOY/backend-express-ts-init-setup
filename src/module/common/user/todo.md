# Pagination

✅ 1. Controller Layer (user.controller.ts)
```typescript
import { Request, Response } from 'express';
import { getPaginatedUsers } from '../services/user.service';
import { sendResponse } from '../utils/sendResponse';

export const getUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { data, total } = await getPaginatedUsers(skip, limit);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users fetched successfully',
    data,
    meta: {
      total,
      page,
      limit,
    },
  });
};
////


```

✅ 2. Service Layer (user.service.ts)
```typescript
import { User } from '../models/user.model';

export const getPaginatedUsers = async (skip: number, limit: number) => {
  const data = await User.find().skip(skip).limit(limit);
  const total = await User.countDocuments();

  return { data, total };
};
```

✅ 3. Sample Request
```bash
GET /api/users?page=2&limit=5
```

✅ Example Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users fetched successfully",
  "data": [
    { "_id": "123", "name": "Jane Doe" },
    { "_id": "124", "name": "John Smith" }
  ],
  "meta": {
    "total": 27,
    "page": 2,
    "limit": 5
  }
}
```