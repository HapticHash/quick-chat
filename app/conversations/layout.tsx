import getCoversations from "../actions/getConversations";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coversations = await getCoversations();
  return (
    <Sidebar>
      <div className="h-full bg-gray-50">
        <ConversationList initialItems={coversations} />
        {children}
      </div>
    </Sidebar>
  );
}
