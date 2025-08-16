export default function AdminHome() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="text-sm text-gray-600 mb-4">Use navigation above to manage Gallery and Projects.</p>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        <li>Gallery: upload new images (stored on R2, metadata in Firestore)</li>
        <li>Projects: manage project entries with 3 images</li>
        <li>Auth: simple email/password validation against Firestore users collection</li>
      </ul>
    </div>
  );
}
