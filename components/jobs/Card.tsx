import { Job } from "@/lib/generated/prisma";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DeleteButton } from "./DeleteButton";

interface Props {
  job: Job;
}
export const JobCard = ({ job }: Props) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <p>{job.link}</p>
        <p>{job.localisation}</p>
        <p>{job.salary}</p>
        <p>{job.localisation}</p>
        <p>{job.notes}</p>
        <Badge>{job.status}</Badge>
      </CardContent>
      <CardFooter>
        <CardAction className="flex justify-between w-full">
          <DeleteButton />
          <Button variant="outline">Modifier</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};
