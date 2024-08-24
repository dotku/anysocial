import FundraisingList from "@/components/Fundraising/FundraisingList";

export default function FundraisingPage() {
  console.log("fundraising page");
  return (
    <>
      <h2 className="text-2xl my-3">Fundraising List</h2>
      <FundraisingList />
    </>
  );
}
