# API Integration Guide

This guide explains how to integrate your REST APIs with this React application.

## Quick Start

### 1. Configure API Base URL

Edit `.env` file (copy from `.env.example` if needed):

```env
REACT_APP_API_BASE_URL=https://your-api-endpoint.com
REACT_APP_API_TIMEOUT=10000
```

### 2. Update Type Definitions

Edit `src/types/api.types.ts` to match your API responses:

```typescript
export interface YourDataType {
  id: number;
  name: string;
  // Add your fields here
}
```

### 3. Add API Endpoints

Edit `src/services/data.service.ts`:

```typescript
export const dataService = {
  // GET request
  getData: () => {
    return apiService.get<YourDataType[]>('/your-endpoint');
  },
  
  // POST request
  createData: (data: Partial<YourDataType>) => {
    return apiService.post<YourDataType>('/your-endpoint', data);
  },
  
  // PUT request
  updateData: (id: number, data: Partial<YourDataType>) => {
    return apiService.put<YourDataType>(`/your-endpoint/${id}`, data);
  },
  
  // DELETE request
  deleteData: (id: number) => {
    return apiService.delete<void>(`/your-endpoint/${id}`);
  },
};
```

### 4. Use in Components

**Automatic Fetching (on component mount):**

```typescript
import { useFetch } from '../hooks/useFetch';
import { dataService } from '../services/data.service';

function MyComponent() {
  const { data, loading, error, refetch } = useFetch(
    () => dataService.getData(),
    [] // dependencies array
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />;
  
  return (
    <div>
      {data?.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

**Manual Execution (e.g., on button click):**

```typescript
import { useApi } from '../hooks/useApi';
import { dataService } from '../services/data.service';

function MyComponent() {
  const { execute, loading, error } = useApi(
    (data) => dataService.createData(data)
  );

  const handleCreate = async () => {
    try {
      const result = await execute({ name: 'New Item' });
      console.log('Created:', result);
    } catch (err) {
      console.error('Failed:', err);
    }
  };

  return (
    <Button onClick={handleCreate} loading={loading}>
      Create Item
    </Button>
  );
}
```

## API Service Features

### Authentication

The API service automatically includes JWT tokens from localStorage:

```typescript
// After successful login
localStorage.setItem('authToken', 'your-jwt-token');

// All subsequent requests will include:
// Authorization: Bearer your-jwt-token

// On logout
localStorage.removeItem('authToken');
```

### Request Interceptor

Located in `src/services/api.service.ts`:

```typescript
this.api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
```

### Response Interceptor

Automatically handles errors and formats them:

```typescript
this.api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };
    return Promise.reject(apiError);
  }
);
```

## Expected API Response Format

The application expects this response format:

```json
{
  "data": { /* your data here */ },
  "message": "Success message (optional)",
  "status": 200
}
```

### For Paginated Endpoints

```json
{
  "data": [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

### For Error Responses

```json
{
  "message": "Error description",
  "status": 400,
  "errors": {
    "field1": ["Error message 1"],
    "field2": ["Error message 2"]
  }
}
```

## Custom Hooks

### useFetch

**Purpose**: Automatically fetch data when component mounts

**Features**:
- Automatic loading state
- Error handling
- Refetch capability
- Re-fetch on dependency change

**Usage**:
```typescript
const { data, loading, error, refetch } = useFetch(
  () => dataService.getData(),
  [dependency1, dependency2] // re-fetch when these change
);
```

### useApi

**Purpose**: Execute API calls manually (e.g., on user action)

**Features**:
- Manual execution
- Loading state
- Error handling
- Reset capability

**Usage**:
```typescript
const { execute, loading, error, data, reset } = useApi(
  (param1, param2) => dataService.updateData(param1, param2)
);

// Later, call execute with parameters
await execute(id, newData);
```

## Common Patterns

### Pattern 1: List with Pagination

```typescript
function MyList() {
  const [page, setPage] = useState(1);
  
  const { data, loading, error } = useFetch(
    () => dataService.getItems({ page, limit: 10 }),
    [page] // refetch when page changes
  );

  return (
    <div>
      {/* render items */}
      <Button onClick={() => setPage(p => p + 1)}>
        Next Page
      </Button>
    </div>
  );
}
```

### Pattern 2: Create/Update with Form

```typescript
function MyForm() {
  const [formData, setFormData] = useState({});
  const { execute, loading } = useApi(
    (data) => dataService.createItem(data)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await execute(formData);
      // Success: show message, redirect, etc.
    } catch (err) {
      // Error: show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <Button type="submit" loading={loading}>
        Submit
      </Button>
    </form>
  );
}
```

### Pattern 3: Delete with Confirmation

```typescript
function MyItem({ item, onDelete }) {
  const { execute, loading } = useApi(
    (id) => dataService.deleteItem(id)
  );

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await execute(item.id);
        onDelete(); // callback to parent
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div>
      {item.name}
      <Button onClick={handleDelete} loading={loading} variant="danger">
        Delete
      </Button>
    </div>
  );
}
```

### Pattern 4: Search/Filter

```typescript
function SearchableList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, loading } = useFetch(
    () => dataService.search(debouncedQuery),
    [debouncedQuery]
  );

  return (
    <div>
      <Input
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search..."
      />
      {loading ? <Loading /> : <Results data={data} />}
    </div>
  );
}
```

## Modifying for Different API Structures

If your API doesn't follow the expected format, modify `api.service.ts`:

```typescript
// If your API returns data directly (not wrapped in { data: ... })
async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response: AxiosResponse<T> = await this.api.get(url, config);
  return response.data; // Changed from response.data.data
}
```

## Testing API Integration

1. **Start with mock data**: Replace API calls with mock data first
2. **Test with Postman**: Verify API endpoints work correctly
3. **Use browser DevTools**: Check Network tab for API calls
4. **Add console.logs**: Debug data flow in services and hooks

## Troubleshooting

### CORS Issues
If you see CORS errors, your backend needs to allow requests from `http://localhost:3000`

### 401 Unauthorized
Check if your token is correctly stored and sent:
```javascript
console.log(localStorage.getItem('authToken'));
```

### Type Errors
Ensure your TypeScript types match the actual API response:
```typescript
// Add ? for optional fields
export interface MyType {
  id: number;
  name: string;
  optional?: string; // May not always be present
}
```

### Timeout Errors
Increase timeout in `.env`:
```env
REACT_APP_API_TIMEOUT=30000
```

## Next Steps

1. ✅ Configure your API base URL
2. ✅ Define your data types
3. ✅ Add your API endpoints
4. ✅ Test with your components
5. ✅ Handle authentication if needed
6. ✅ Deploy and test in production

For more examples, check the existing Dashboard and ProductList components!
