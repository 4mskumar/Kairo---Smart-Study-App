import React, { useEffect } from "react";
import { useTodoStore } from "../../../app/todoStore";
import { useAuth } from "@clerk/clerk-react";
import { CheckCircle, Circle, Delete, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";

const TodoList = () => {
  const { todos, loading, error, fetchTodos, deleteTodo, markAsCompleted } =
    useTodoStore();
  const { userId } = useAuth();

  useEffect(() => {
    fetchTodos(userId);
  }, [fetchTodos, userId, deleteTodo, markAsCompleted]);
  // console.log(todos);

  if (loading) return <p className="text-gray-500 text-sm">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-3 pr-2">
      {!todos || todos.length === 0 ? (
        <div className="w-full flex justify-center items-center">
          <img src="/images/todo.png" className="w-96 opacity-60"/>
        </div>
      ) : (
        todos.map((val, ind) => (
          <div
            key={ind}
            className="flex  items-center justify-between bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3 hover:shadow-md transition"
          >
            {/* Left side */}
            <div className="flex items-center gap-3">
              {/* Placeholder for checkbox icon */}
              <Circle
                className={`text-gray-800 w-5 h-5 ${
                  val.completed && "text-zinc-400"
                }`}
              />

              <div>
                <p
                  className={`text-gray-800 ${
                    val.completed && "text-zinc-400"
                  }`}
                >
                  {val.taskName}
                </p>
                <p
                  className={`text-xs font-semibold mt-1 ${
                    val.priority === "High"
                      ? "text-red-500"
                      : val.priority === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  } ${val.completed && "text-zinc-400"}`}
                >
                  {val.priority} Priority
                </p>
              </div>
            </div>

            {/* Right side (status / actions) */}
            <div className="flex items-center gap-3">
              <AlertDialog>
                <AlertDialogTrigger>
                  {!val.completed && (
                    <CheckCircle
                      className={`w-5 h-5 text-gray-300 hover:text-green-500 cursor-pointer transition ${
                        val.priority === "High"
                          ? "hover:text-red-500"
                          : val.priority === "Medium"
                          ? "hover:text-yellow-500"
                          : "hover:text-green-500"
                      }`}
                    />
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently mark
                      your task as completed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => markAsCompleted(userId, val.taskName)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash2
                    className={`w-5 h-5 text-gray-300 hover:text-red-500 cursor-pointer transition`}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your task.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        deleteTodo(userId, val._id);
                        await fetchTodos(userId)
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
