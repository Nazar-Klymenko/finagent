import express from "express";

declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
      isSupervisor?: any;
    }
  }
}
