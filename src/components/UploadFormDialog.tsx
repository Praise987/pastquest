import { useState } from "react";
import { Alert, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, MenuItem, Paper, Snackbar, Stack, TextField,Typography,
} from "@mui/material";

const DEPARTMENTS = [
  "Computer Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
];

const LEVELS = ["100", "200", "300", "400", "500"];

const SEMESTERS = [
  { value: "First", label: "First Semester" },
  { value: "Second", label: "Second Semester" },
];

const MAX_FILE_SIZE_MB = 20;
const ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"];

interface FormState {
  courseCode: string;
  courseTitle: string;
  department: string;
  level: string;
  semester: string;
}

const INITIAL_FORM: FormState = {
  courseCode: "",
  courseTitle: "",
  department: "",
  level: "",
  semester: "",
};

interface UploadFormDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function UploadFormDialog({
  open,
  onClose,
}: UploadFormDialogProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    severity: "success" | "error";
  } | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setFileError("Only PDF, PNG or JPG files are allowed.");
      setFile(null);
      return;
    }

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`File must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      setFile(null);
      return;
    }

    setFileError(null);
    setFile(selected);
  };

  const isFormValid =
    form.courseCode.trim() !== "" &&
    form.courseTitle.trim() !== "" &&
    form.department !== "" &&
    form.level !== "" &&
    form.semester !== "" &&
    file !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid || !file) return;

    setSubmitting(true);

    try {
      const data = new FormData();

      data.append("courseCode", form.courseCode);
      data.append("courseTitle", form.courseTitle);
      data.append("department", form.department);
      data.append("level", form.level);
      data.append("semester", form.semester);
      data.append("file", file);

      

      setToast({
        message: "Material uploaded successfully.",
        severity: "success",
      });

      setForm(INITIAL_FORM);
      setFile(null);

      onClose();
    } catch {
      setToast({
        message: "Something went wrong.",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Upload Material</DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Paper elevation={0}>
              <Stack
                component="form"
                spacing={3}
                onSubmit={handleSubmit}
              >
                <TextField
                  label="Course Code"
                  value={form.courseCode}
                  onChange={handleChange("courseCode")}
                  required
                  fullWidth
                />

                <TextField
                  label="Course Title"
                  value={form.courseTitle}
                  onChange={handleChange("courseTitle")}
                  required
                  fullWidth
                />

                <TextField
                  select
                  label="Department"
                  value={form.department}
                  onChange={handleChange("department")}
                  fullWidth
                  required
                >
                  {DEPARTMENTS.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Level"
                  value={form.level}
                  onChange={handleChange("level")}
                  fullWidth
                  required
                >
                  {LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Semester"
                  value={form.semester}
                  onChange={handleChange("semester")}
                  fullWidth
                  required
                >
                  {SEMESTERS.map((sem) => (
                    <MenuItem key={sem.value} value={sem.value}>
                      {sem.label}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  variant="outlined"
                  component="label"
                >
                  {file ? file.name : "Choose File"}

                  <input
                    hidden
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                  />
                </Button>

                {fileError && (
                  <Typography color="error">
                    {fileError}
                  </Typography>
                )}

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "flex-end" }}
                >
                  <Button onClick={onClose}>
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isFormValid || submitting}
                  >
                    {submitting ? (
                      <CircularProgress
                        size={20}
                        color="inherit"
                      />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={toast !== null}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
      >
        {toast ? (
          <Alert
            severity={toast.severity}
            onClose={() => setToast(null)}
          >
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
);
}