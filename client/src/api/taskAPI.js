import axios from 'axios';

export const fetchTasks = async () => {
  const source = axios.CancelToken.source();
  try {
    const res = await axios.get('/api/tasks', { cancelToken: source.token });
    if (!Array.isArray(res.data)) {
      throw new Error("Invalid API response: Expected an array");
    }
    const validTasks = res.data.filter(
      (task) => task && task._id && task.status && task.dueDate && task.title
    );
    if (validTasks.length < res.data.length) {
      console.warn("Filtered out invalid tasks:", res.data.length - validTasks.length);
    }
    return validTasks;
  } catch (err) {
    if (axios.isCancel(err)) {
      return [];
    }
    console.error("Fetch tasks error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to fetch tasks");
  }
};

export const createTask = async (task) => {
  const source = axios.CancelToken.source();
  try {
    const res = await axios.post('/api/tasks', task, { cancelToken: source.token });
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      return null;
    }
    console.error("Create task error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to create task");
  }
};

export const updateTask = async (id, updates) => {
  const source = axios.CancelToken.source();
  try {
    const res = await axios.put(`/api/tasks/${id}`, updates, { cancelToken: source.token });
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      return null;
    }
    console.error("Update task error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to update task");
  }
};

export const deleteTask = async (id) => {
  const source = axios.CancelToken.source();
  try {
    const res = await axios.delete(`/api/tasks/${id}`, { cancelToken: source.token });
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      return null;
    }
    console.error("Delete task error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to delete task");
  }
};