export default async function NoteDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } =  await params;

    return (
        <div>
            <h1>Detail Catatan #{id}</h1>
        </div>
    )
}