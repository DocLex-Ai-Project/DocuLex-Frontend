export default function UserDashboard() {

return (

<section className="p-6">

{/* Page Title */}
<h1 className="text-2xl font-semibold mb-6 text-gray-800">
Dashboard
</h1>

{/* Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

{/* Documents Card */}
<div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition">

<h2 className="text-gray-500 text-sm mb-2">
Documents
</h2>

<p className="text-3xl font-bold text-gray-800">
12
</p>

</div>

{/* AI Reviews Card */}
<div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition">

<h2 className="text-gray-500 text-sm mb-2">
AI Reviews
</h2>

<p className="text-3xl font-bold text-gray-800">
4
</p>

</div>

{/* Pending Lawyer Review Card */}
<div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition">

<h2 className="text-gray-500 text-sm mb-2">
Pending Lawyer Review
</h2>

<p className="text-3xl font-bold text-gray-800">
2
</p>

</div>

</div>

</section>

);

}