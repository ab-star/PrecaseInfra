"use client";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Image from "next/image";
// MUI
import { Box, Paper, Typography, TextField, Button, CircularProgress, Snackbar, Alert, InputAdornment } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SubjectIcon from "@mui/icons-material/Subject";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string | undefined }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please enter your name";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email";
    if (!contact.trim()) next.contact = "Please enter a contact number";
    if (!subject.trim()) next.subject = "Please enter a subject";
    if (!message.trim()) next.message = "Please enter your message";
    setErrors(next);
    return Object.keys(next).length ? "Invalid" : null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const err = validate();
    if (err) {
      setStatus({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }
    try {
      setLoading(true);
      await addDoc(collection(db, "contacts"), {
        name: name.trim(),
        email: email.trim(),
        contact: contact.trim(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setStatus({ type: "success", text: "Thank you! Your message has been sent." });
      setName("");
      setEmail("");
      setContact("");
      setSubject("");
      setMessage("");
      setErrors({});
    } catch {
      setStatus({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", py: { xs: 6, md: 10 } }}>
      {/* Background */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.55)" }} />
        <Image
          src="/groupPeople.png"
          alt="Background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "top center" }}
          className="pointer-events-none select-none"
          priority
        />
      </Box>

      {/* Card */}
      <Box sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 800, px: { xs: 2.5, sm: 3 } }}>
        <Paper elevation={16} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, backdropFilter: "blur(4px)" }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h4" fontWeight={800} color="text.primary" sx={{ mb: 1 }}>
              Contact Us
            </Typography>
            <Typography color="text.secondary">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </Typography>
          </Box>

          <Box component="form" onSubmit={onSubmit} noValidate>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2.5 }}>
              <Box>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  label="Contact Number"
                  fullWidth
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  error={Boolean(errors.contact)}
                  helperText={errors.contact}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  label="Subject"
                  fullWidth
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  error={Boolean(errors.subject)}
                  helperText={errors.subject}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SubjectIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: "auto", md: "1 / -1" } }}>
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  minRows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                />
              </Box>

              <Box sx={{ gridColumn: { xs: "auto", md: "1 / -1" } }}>
                <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ px: 4, py: 1.25, textTransform: "none", borderRadius: 2 }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar */}
      {status && (
        <Snackbar
          open
          autoHideDuration={4000}
          onClose={() => setStatus(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setStatus(null)} severity={status.type} variant="filled" sx={{ width: "100%" }}>
            {status.text}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}