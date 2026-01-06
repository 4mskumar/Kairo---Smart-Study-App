
import { toast } from 'sonner';
import { create } from 'zustand'
import { api } from '../api/axiosConfig';

export const useTodoStore = create((set) => ({
    todos: [],
    loading: false,
    error: null,

    addTodo: async (taskName, userId, priority) => {
        set({ loading: true, error: null })
        try {
            if (!taskName) {
                toast("Please enter a task");
                return;
            }

            const res = await api.post("/add-todo-task", {
                userId,
                taskName,
                priority, // ✅ send priority
            });


            if (res.data.success) {
                set((state) => ({
                    todos: [{ taskName, priority, userId }, ...state.todos]
                }))
                set({ loading: false, error: null })
                return { message: res.data.message, success: true }
            } else {
                return { message: res.data.message, success: false }
            }
        } catch (error) {
            return { message: error.message, success: false }
        }
    },

    fetchTodos: async (userId) => {
        set({ loading: true, error: null });
        try {
            const res = await api.get("/all-todos", {
                params: { userId }
            });

            // console.log(res.data)

            if (res.data.success) {
                set({
                    todos: res.data.allTodos,
                    loading: false
                });
                return { success: true };
            } else {
                set({ loading: false, error: "Failed to fetch todos" });
                return { success: false };
            }
        } catch (error) {
            set({ loading: false, error: error.message });
            return { message: error.message, success: false };
        }
    },
    deleteTodo: async (userId, id) => {
        set({ loading: true, error: null });
        console.log(userId);

        try {
            const res = await api.post("/delete-todo", {
                userId, id
            });

            // console.log(res.data.todos)

            if (res.data.success) {
                set({
                    todos : res.data.todos
                });
                return { success: true };
            } else {
                set({ loading: false, error: res.data.message });
                return { success: false };
            }
        } catch (error) {
            set({ loading: false, error: error.message });
            return { message: error.message, success: false };
        }
    },


    markAsCompleted: async (userId, taskName) => {
        try {
            const res = await api.post('/completed', { userId, taskName })
            if (res.data.success) {
                set((state) => ({
                    todos: state.todos.map((t) =>
                        t.taskName === taskName ? { ...t, completed: true } : t
                    ),
                }));
                toast(res.data.message, {
                    className: "animate-bounce bg-green-100 text-green-700 font-semibold shadow-md rounded-xl",
                });
                return { success: true, message: res.data.qoutes };
            } else {
                set({ loading: false, error: res.data.message });
                return { success: false, message: res.data.message };
            }
        } catch (error) {
            set({ loading: false, error: error.message });
            return { success: false, message: error.message };
        }
    }

}))

