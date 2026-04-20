// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Myfiles from "./pages/Myfiles";
import PublicFileView from "./pages/PublicFileView";
import Subscription from "./pages/Subscription";
import Transaction from "./pages/Transaction";
import Upload from "./pages/Upload";
import { SignedIn, SignedOut, RedirectToSignIn, ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import {  UserCreditsProvider } from "./context/UserCreditContext";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <UserCreditsProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/dashboard" element={
            <>
              <SignedIn><Dashboard/></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>

          } />
          <Route path="/myfiles" element={
            <>
              <SignedIn> <Myfiles /></SignedIn>
              <SignedOut> <RedirectToSignIn /> </SignedOut>
            </>
          } />
          <Route path="/public" element={<PublicFileView />} />
          <Route path="/subscription" element={
            <>
              <SignedIn><Subscription /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } />
          <Route path="/transaction" element={
            <>
              <SignedIn><Transaction /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } />
          <Route path="/upload" element={
            <>
              <SignedIn><Upload /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } />

          <Route path="/file/:fileId" element={
            <>
            <PublicFileView/>
            </>
          } /> 
          <Route path="/*" element={<Landing/>} />
        </Routes>
      </BrowserRouter>
    </UserCreditsProvider>

  );
}
