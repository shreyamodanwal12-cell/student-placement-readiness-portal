import { useEffect, useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import api from "../../api/api";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // GET NOTIFICATIONS
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/notifications");

      console.log(
        "NOTIFICATIONS RESPONSE:",
        response.data
      );

      setNotifications(
        response.data.notifications || []
      );
    } catch (error) {
      console.log(
        "NOTIFICATIONS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // MARK AS READ
  const markAsRead = async (id) => {
    try {
      const response = await api.put(
        `/notifications/${id}/read`
      );

      console.log(
        "MARK READ RESPONSE:",
        response.data
      );

      fetchNotifications();
    } catch (error) {
      console.log(
        "MARK READ ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // DELETE
  const deleteNotification = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(
        `/notifications/${id}`
      );

      console.log(
        "DELETE NOTIFICATION:",
        response.data
      );

      fetchNotifications();
    } catch (error) {
      console.log(
        "DELETE NOTIFICATION ERROR:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-brand-50 p-3">
            <Bell className="h-6 w-6 text-brand-600" />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Notifications
            </p>

            <h1 className="mt-1 text-3xl font-semibold text-slate-950">
              Notifications
            </h1>
          </div>
        </div>

        <p className="mt-3 text-slate-600">
          Stay updated with your placement activities
          and important updates.
        </p>
      </div>

      {/* NOTIFICATIONS */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-premium">

        <h2 className="text-xl font-semibold text-slate-950">
          Your Notifications
        </h2>

        {loading ? (
          <p className="mt-6 text-slate-500">
            Loading notifications...
          </p>
        ) : notifications.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-slate-50 p-8 text-center">
            <Bell className="mx-auto h-10 w-10 text-slate-400" />

            <p className="mt-4 font-semibold text-slate-700">
              No notifications yet
            </p>

            <p className="mt-2 text-sm text-slate-500">
              You will see important placement updates
              here.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">

            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl border p-5 transition ${
                  notification.is_read
                    ? "border-slate-200 bg-white"
                    : "border-brand-200 bg-brand-50"
                }`}
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  {/* CONTENT */}
                  <div className="flex gap-4">

                    <div
                      className={`mt-1 rounded-xl p-2 ${
                        notification.is_read
                          ? "bg-slate-100"
                          : "bg-brand-100"
                      }`}
                    >
                      <Bell
                        className={`h-5 w-5 ${
                          notification.is_read
                            ? "text-slate-500"
                            : "text-brand-600"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-semibold text-slate-950">
                          {notification.title}
                        </h3>

                        {!notification.is_read && (
                          <span className="rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white">
                            New
                          </span>
                        )}

                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {notification.message}
                      </p>

                      <p className="mt-3 text-xs text-slate-400">
                        {notification.created_at
                          ? new Date(
                              notification.created_at
                            ).toLocaleString()
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2">

                    {!notification.is_read && (
                      <button
                        type="button"
                        onClick={() =>
                          markAsRead(notification.id)
                        }
                        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Check className="h-4 w-4" />
                        Read
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        deleteNotification(
                          notification.id
                        )
                      }
                      className="flex items-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;