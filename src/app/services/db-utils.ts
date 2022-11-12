export function convertSnaps(snaps) {
    return snaps.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return { id, ...data };
      });
}