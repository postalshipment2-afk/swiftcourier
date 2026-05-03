import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { toast } from "sonner";
import { Search, Edit, MapPin, Bell, Trash2, Calendar } from "lucide-react";

export function ManageShipments() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    status: "",
    current_location: "",
    notes: "",
    receiver_name: "",
    receiver_email: "",
    receiver_phone: "",
    receiver_city: "",
    receiver_country: "",
    package_description: "",
    package_weight: "",
    receiver_address: "", // Added
    departure_date: "", // Added
    arrival_date: "", // Added
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setShipments(data || []);
    } catch (error) {
      console.error("Error fetching shipments:", error);
      toast.error("Failed to load shipments");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShipment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this shipment?")) return;

    try {
      const { error } = await supabase.from("shipments").delete().eq("id", id);
      if (error) throw error;
      toast.success("Shipment deleted successfully");
      setShipments(shipments.filter((s) => s.id !== id));
    } catch (error) {
      toast.error("Failed to delete shipment");
    }
  };

  const sendNotification = async (
    email: string,
    subject: string,
    message: string,
  ) => {
    console.log(`Sending notification to ${email}: ${subject} - ${message}`);
    toast.info(`Notification sent to ${email}`);
  };

  const handleUpdateStatus = async (shipmentId: string, shipment: any) => {
    try {
      const updates: any = {
        ...editForm,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("shipments")
        .update(updates)
        .eq("id", shipmentId);

      if (error) throw error;

      await supabase.from("status_history").insert([
        {
          shipment_id: shipmentId,
          status: editForm.status || shipment.status,
          location: editForm.current_location || shipment.current_location,
          timestamp: new Date().toISOString(),
          notes: editForm.notes,
        },
      ]);

      if (editForm.status && editForm.status !== shipment.status) {
        await sendNotification(
          shipment.sender_email,
          "Status Updated",
          `Tracking ${shipment.tracking_number} status: ${editForm.status.toUpperCase()}`,
        );
      }

      toast.success("Shipment updated successfully!");
      setEditingId(null);
      fetchShipments();
    } catch (error) {
      console.error("Error updating shipment:", error);
      toast.error("Failed to update shipment");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "on_hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredShipments = shipments.filter(
    (s) =>
      s.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.sender_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.receiver_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return <div className="text-center py-8">Loading shipments...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Shipments</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search shipments..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredShipments.map((shipment) => (
          <div
            key={shipment.id}
            className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl mb-2">
                  Tracking:{" "}
                  <span className="font-mono text-blue-600">
                    {shipment.tracking_number}
                  </span>
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(shipment.status)}`}
                >
                  {shipment.status?.replace("_", " ").toUpperCase()}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (editingId === shipment.id) {
                      setEditingId(null);
                    } else {
                      setEditingId(shipment.id);
                      setEditForm({
                        status: shipment.status,
                        current_location: shipment.current_location,
                        notes: "", // Usually reset notes for new update
                        receiver_name: shipment.receiver_name,
                        receiver_email: shipment.receiver_email,
                        receiver_phone: shipment.receiver_phone,
                        receiver_city: shipment.receiver_city,
                        receiver_country: shipment.receiver_country,
                        // ADD THIS LINE BELOW
                        receiver_address: shipment.receiver_address || "",
                        package_description: shipment.package_description,
                        package_weight: shipment.package_weight,
                        departure_date: shipment.departure_date,
                        arrival_date: shipment.arrival_date,
                      });
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4" />
                  {editingId === shipment.id ? "Cancel" : "Update"}
                </button>
                <button
                  onClick={() => handleDeleteShipment(shipment.id)}
                  className="p-2 bg-red-50 text-red-600 rounded-md border border-red-100 hover:bg-red-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* View Mode Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  From
                </p>
                <p className="font-medium">{shipment.sender_name}</p>
                <p className="text-sm text-gray-600">
                  {shipment.sender_city}, {shipment.sender_country}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  To
                </p>
                <p className="font-medium">{shipment.receiver_name}</p>
                <p className="text-sm text-gray-600">
                  {shipment.receiver_city}, {shipment.receiver_country}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Package
                </p>
                <p className="font-medium">{shipment.package_description}</p>
                <p className="text-sm text-gray-600">
                  {shipment.package_weight} kg
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Timeline
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Dep:</span>{" "}
                  {shipment.departure_date || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Arr:</span>{" "}
                  {shipment.arrival_date || "N/A"}
                </p>
              </div>
            </div>

            {/* Edit Mode Form */}
            {editingId === shipment.id && (
              <div className="mt-4 p-4 bg-blue-50/50 border border-blue-100 rounded-lg space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Status & Location */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="on_hold">On Hold</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Current Location
                    </label>
                    <input
                      type="text"
                      value={editForm.current_location}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          current_location: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>

                  {/* Dates Row */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={editForm.departure_date}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          departure_date: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Expected Arrival Date
                    </label>
                    <input
                      type="date"
                      value={editForm.arrival_date}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          arrival_date: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>

                  {/* Receiver Info Group 1 */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Receiver Name
                    </label>
                    <input
                      type="text"
                      value={editForm.receiver_name}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          receiver_name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Receiver Email
                    </label>
                    <input
                      type="email"
                      value={editForm.receiver_email}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          receiver_email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>

                  {/* NEW: Receiver Phone & Country */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Receiver Phone
                    </label>
                    <input
                      type="tel"
                      value={editForm.receiver_phone}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          receiver_phone: e.target.value,
                        })
                      }
                      placeholder="+1 234 567 890"
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Receiver Country
                    </label>
                    <input
                      type="text"
                      value={editForm.receiver_country}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          receiver_country: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>

                  {/* Receiver Address (Spans full width for better readability) */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Receiver Address
                    </label>
                    <input
                      type="text"
                      value={editForm.receiver_address}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          receiver_address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                </div>

                {/* Package Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Package Description
                  </label>
                  <textarea
                    value={editForm.package_description}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        package_description: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                {/* Internal Notes */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Internal Notes (Appears in History)
                  </label>
                  <textarea
                    value={editForm.notes}
                    onChange={(e) =>
                      setEditForm({ ...editForm, notes: e.target.value })
                    }
                    rows={2}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                <button
                  onClick={() => handleUpdateStatus(shipment.id, shipment)}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  Save Changes & Notify
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
