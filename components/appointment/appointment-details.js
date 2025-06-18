import { format } from "date-fns";
import { SmallCard } from "../small-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const AppointmentDetails = ({
  id,
  patient_id,
  appointment_date,
  time,
  notes,
}) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Appointment Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex">
          <SmallCard label="Appointment #" value={`# ${id}`} />
          <SmallCard
            label="Date"
            value={format(new Date(appointment_date), "MMM d, yyyy")}
          />
          <SmallCard label="Time" value={time} />
        </div>

        <div>
          <span className="text-sm font-medium">Additional Notes</span>
          <p className="text-sm text-gray-500">{notes || "No notes"}</p>
        </div>
      </CardContent>
    </Card>
  );
};
