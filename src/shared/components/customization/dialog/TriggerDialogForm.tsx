import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/src/shared/components/ui/dialog';

interface Props {
  titleDialog: string;
  trigger: React.ReactNode;
  form: React.ReactNode;
  className?: string;
}
const TriggerDialogForm = (data: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{data.trigger}</DialogTrigger>
      <DialogContent className={data.className}>
        <DialogHeader>
          <DialogTitle>{data.titleDialog}</DialogTitle>
          <DialogDescription>{data.form}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TriggerDialogForm;
