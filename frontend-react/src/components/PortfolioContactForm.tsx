import { useMemo, useState } from "react";
import type { FormEvent } from "react";

export default function PortfolioContactForm() {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const wordCount = useMemo(() => (message.trim().match(/\b\w+\b/g) || []).length, [message]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (
      subject.length < 4 ||
      name.length < 3 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
      phone.replace(/\D/g, "").length < 10 ||
      wordCount < 10
    ) {
      alert("Please fix fields and try again.");
      return;
    }
    console.log("Contact form submission:", { subject, name, email, phone, message });
    alert("Thank you! Your message has been sent (demo only).");
    setSubject("");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="contact-form-wrapper">
      <h2>Let's talk about your project</h2>
      <form className="contact-form-form" onSubmit={submit} noValidate>
        <input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject*" />
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name*" />
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email*" />
        <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone*" />
        <textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message*" />
        <div className="contact-form-msg-counter">Words: {wordCount} / 10 minimum</div>
        <div className="contact-form-actions">
          <button type="submit">Send</button>
          <button
            type="button"
            onClick={() => {
              setSubject("");
              setName("");
              setEmail("");
              setPhone("");
              setMessage("");
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
