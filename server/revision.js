import { Revision } from "./models/revisionSchema.js";

const REVISION_GAPS = [1, 3, 7, 14, 30]; // days

export const createRevisionsForSession = async (session) => {
    console.log(session.user, session._id);
    
  const baseDate = new Date();

  const revisions = REVISION_GAPS.map((gap, index) => {
    const due = new Date(baseDate);
    due.setDate(due.getDate() + gap);

    return {
      user: session.user,
      studySessionId: session._id,
      subject: session.subject,
      topic: session.topic,
      revisionNumber: index + 1,
      dueDate: due,
    };
  });

  await Revision.insertMany(revisions);
};
