"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { appointmentAction } from "@/app/actions/appointment";

export const AppointmentActionOptions = ({ id, status }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [reason, setReason] = useState("");
  const router = useRouter();

  const handleAction = async () => {
    try {
      setIsLoading(true);

      const newReason =
        reason ||
        `Appointment has been ${selected.toLowerCase()} on ${new Date().toLocaleString()}`;

      console.log("Submitting:", { id, selected, reason: newReason });

      if (!id) {
        toast.error("Missing appointment ID");
        return;
      }

      const resp = await appointmentAction(id, selected, newReason);

      if (resp?.success) {
        toast.success(resp.msg);
        setSelected("");
        setReason("");
        router.refresh();
      } else {
        toast.error(resp?.msg || "Action failed");
      }
    } catch (error) {
      console.error("AppointmentActionOptions error:", error);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          disabled={status === "PENDING" || isLoading || status === "COMPLETED"}
          className="bg-yellow-200 text-black"
          onClick={() => setSelected("PENDING")}
        >
          Pending
        </Button>
        <Button
          variant="outline"
          disabled={status === "SCHEDULED" || isLoading || status === "COMPLETED"}
          className="bg-blue-200 text-black"
          onClick={() => setSelected("SCHEDULED")}
        >
          Approve
        </Button>
        <Button
          variant="outline"
          disabled={status === "COMPLETED" || isLoading}
          className="bg-emerald-200 text-black"
          onClick={() => setSelected("COMPLETED")}
        >
          Completed
        </Button>
        <Button
          variant="outline"
          disabled={status === "CANCELLED" || isLoading || status === "COMPLETED"}
          className="bg-red-200 text-black"
          onClick={() => setSelected("CANCELLED")}
        >
          Cancel
        </Button>
      </div>

      {selected === "CANCELLED" && (
        <Textarea
          disabled={isLoading}
          className="mt-4"
          placeholder="Enter reason..."
          onChange={(e) => setReason(e.target.value)}
        />
      )}

      {selected && (
        <div className="flex items-center justify-between mt-6 bg-red-100 p-4 rounded">
          <p>Are you sure you want to perform this action?</p>
          <Button disabled={isLoading} type="button" onClick={handleAction}>
            {isLoading ? "Processing..." : "Yes"}
          </Button>
        </div>
      )}
    </div>
  );
};
