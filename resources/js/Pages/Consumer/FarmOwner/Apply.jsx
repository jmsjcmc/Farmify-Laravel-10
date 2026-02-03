import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import ConsumerLayout from "@/Layouts/ConsumerLayout"
import { useForm } from "@inertiajs/react"

export default function ApplyFarmOwner() {
  const { data, setData, post, processing, errors } = useForm({
    farm_name: '',
    location: '',
    latitude: '',
    longitude: '',
    farm_size: '',
    business_permit: null,
    land_title: null,
    government_id: null,
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('farm-owner.apply'), {
      onSuccess: () => toast.success('Application submitted!'),
    })
  }

  function FileInput({ label, accept, onChange, error }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className="border rounded-md p-2 focus:ring-2 focus:ring-[#1B4332]"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

  return (
    <ConsumerLayout>
      <form onSubmit={submit} className="max-w-3xl py-8 mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[#1B4332]">
          Farm Owner Application
        </h1>

        {/* Business Info Card */}
        <Card className="border border-gray-200 shadow-lg rounded-2xl">
          <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold">Business Information</h2>

            <Input
              label="Farm Name"
              placeholder="Enter your farm name"
              value={data.farm_name}
              onChange={(e) => setData('farm_name', e.target.value)}
              error={errors.farm_name}
              required
            />

            <Input
              label="Location"
              placeholder="Enter your farm address"
              value={data.location}
              onChange={(e) => setData('location', e.target.value)}
              error={errors.location}
              required
            />

            {/* Map Picker Placeholder */}
            <div className="mt-2">
              <label className="block mb-1 text-sm font-medium">
                Select Farm on Map
              </label>
              <div className="flex items-center justify-center w-full text-gray-400 bg-gray-100 rounded-lg h-60">
                Map Picker Here
              </div>
            </div>

            <Input
              label="Farm Size (hectares)"
              type="number"
              placeholder="e.g. 2.5"
              value={data.farm_size}
              onChange={(e) => setData('farm_size', e.target.value)}
              error={errors.farm_size}
              required
            />
          </CardContent>
        </Card>

        {/* Legal Documents Upload Card */}
        <Card className="border border-gray-200 shadow-lg rounded-2xl">
          <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold">Legal Documents</h2>

            <FileInput
              label="Government ID"
              accept="image/*,.pdf"
              onChange={(file) => setData('government_id', file)}
              error={errors.government_id}
            />

            <FileInput
              label="Business Permit"
              accept="image/*,.pdf"
              onChange={(file) => setData('business_permit', file)}
              error={errors.business_permit}
            />

            <FileInput
              label="Land Title"
              accept="image/*,.pdf"
              onChange={(file) => setData('land_title', file)}
              error={errors.land_title}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={processing}
            className="bg-[#1B4332] hover:bg-[#166534] text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            {processing ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </div>
      </form>
    </ConsumerLayout>
  )
}
