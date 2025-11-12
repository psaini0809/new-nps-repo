import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, ArrowLeft, ArrowRight, Check, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateResidentialProperty } from "@/hooks/use-resedential.js";
import api from "@/api/axios";

export default function AddProperty() {
  const { toast } = useToast();
  const { mutate: createProperty, isPending } = useCreateResidentialProperty();

  const [step, setStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    subPropertyType: "",
    bhk: "",
    bedrooms: "",
    bathrooms: "",
    availabilityStatus: "",
    ageOfProperty: "",
    city: "",
    locality: "",
    subLocality: "",
    society: "",
    houseNo: "",
    latitude: "",
    longitude: "",
    carpetArea: "",
    builtUpArea: "",
    superBuiltUpArea: "",
    totalFloors: "",
    propertyOnFloor: "",
    furnishingStatus: "",
    furnishings: [],
    otherRooms: [],
    reservedParkingCovered: false,
    reservedParkingOpen: false,
    expectedPrice: "",
    pricePerSqft: "",
    description: "",
    images: [],
    youtubeLink: "",
    instagramLink: "",
    amenities: [],
    propertyFacing: "",
    flooringType: "",
    facingRoadWidth: "",
    locationAdvantages: [],
  });

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const progress = Math.round((step / totalSteps) * 100);
  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, images: files });
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleAddFurnishing = () =>
    setFormData({
      ...formData,
      furnishings: [...formData.furnishings, { item: "", available: true }],
    });

  const handleAddOtherRoom = () =>
    setFormData({
      ...formData,
      otherRooms: [...formData.otherRooms, ""],
    });

  const handleAddAmenity = () =>
    setFormData({ ...formData, amenities: [...formData.amenities, ""] });

  const handleAddLocationAdv = () =>
    setFormData({
      ...formData,
      locationAdvantages: [...formData.locationAdvantages, ""],
    });

  const uploadImages = async () => {
    if (!formData.images || formData.images.length === 0) return [];

    const uploadData = new FormData();
    formData.images.forEach((file: File) => uploadData.append("images", file));

    try {
      const res = await api.post("/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.urls || [];
    } catch (err: any) {
      toast({
        title: "Upload Error",
        description: "Failed to upload images.",
        variant: "destructive",
      });
      return [];
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const uploadedUrls = await uploadImages();

    const payload = {
      subPropertyType: formData.subPropertyType,
      location: {
        city: formData.city,
        locality: formData.locality,
        subLocality: formData.subLocality || undefined,
        society: formData.society || undefined,
        houseNo: formData.houseNo || undefined,
        latitude: parseFloat(formData.latitude) || undefined,
        longitude: parseFloat(formData.longitude) || undefined,
      },
      bhk: Number(formData.bhk),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      areaDetails: {
        carpetArea: Number(formData.carpetArea) || undefined,
        builtUpArea: Number(formData.builtUpArea) || undefined,
        superBuiltUpArea: Number(formData.superBuiltUpArea) || undefined,
      },
      otherRooms: formData.otherRooms,
      furnishingStatus: formData.furnishingStatus || "Unfurnished",
      furnishings: formData.furnishings,
      reservedParking: {
        covered: formData.reservedParkingCovered,
        open: formData.reservedParkingOpen,
      },
      totalFloors: Number(formData.totalFloors) || undefined,
      propertyOnFloor: Number(formData.propertyOnFloor) || undefined,
      availabilityStatus: formData.availabilityStatus || undefined,
      ageOfProperty: Number(formData.ageOfProperty) || undefined,
      images: uploadedUrls,
      youtubeLink: formData.youtubeLink || undefined,
      instagramLink: formData.instagramLink || undefined,
      pricing: {
        expectedPrice: Number(formData.expectedPrice),
        pricePerSqft: Number(formData.pricePerSqft) || undefined,
      },
      description: formData.description || undefined,
      amenities: formData.amenities.filter((a) => a.trim() !== ""),
      propertyFacing: formData.propertyFacing || undefined,
      flooringType: formData.flooringType || undefined,
      facingRoadWidth: Number(formData.facingRoadWidth) || undefined,
      locationAdvantages: formData.locationAdvantages.filter(
        (a) => a.trim() !== ""
      ),
    };

    createProperty(payload, {
      onSuccess: () => {
        toast({
          title: "Property Added",
          description: "Your residential property has been successfully created.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error?.message || "Failed to create property.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 lg:ml-64 px-8 lg:px-12 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add Residential Property</h1>
          <p className="text-muted-foreground">
            Complete all steps to add a new residential listing.
          </p>
          <div className="mt-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm mt-2 text-right text-muted-foreground">
              Step {step} of {totalSteps} ({progress}%)
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {[
                "Basic Details",
                "Location Details",
                "Area & Floor",
                "Furnishing & Rooms",
                "Pricing & Brokerage",
                "Media & Description",
                "Amenities & Facing",
              ][step - 1]}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* ✅ STEP 1: Basic */}
              {step === 1 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Property Type *</Label>
                    <Select
                      value={formData.subPropertyType}
                      required={true}
                      onValueChange={(v) =>
                        setFormData({ ...formData, subPropertyType: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Plot">Plot</SelectItem>
                        <SelectItem value="Flat">Flat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>BHK *</Label>
                    <Input
                      type="number"
                      placeholder="Enter BHK"
                      value={formData.bhk}
                      required={true}
                      onChange={(e) =>
                        setFormData({ ...formData, bhk: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Bedrooms</Label>
                    <Input
                      type="number"
                      value={formData.bedrooms}
                      placeholder="number of bedrooms"
                      onChange={(e) =>
                        setFormData({ ...formData, bedrooms: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Bathrooms</Label>
                    <Input
                      type="number"
                      placeholder="number of bathrooms"
                      value={formData.bathrooms}
                      onChange={(e) =>
                        setFormData({ ...formData, bathrooms: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* ✅ STEP 2: Location */}
              {step === 2 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {["city", "locality", "subLocality", "society", "houseNo"].map(
                    (field) => (
                      <div key={field}>
                        <Label className="capitalize">{field}</Label>
                        <Input
                          value={(formData as any)[field]}
                          required={true}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field]: e.target.value,
                            })
                          }
                        />
                      </div>
                    )
                  )}
                  <Input
                    type="number"
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: e.target.value })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Longitude"
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: e.target.value })
                    }
                  />
                </div>
              )}

              {/* ✅ STEP 3: Area & Floor */}
              {step === 3 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {["carpetArea", "builtUpArea", "superBuiltUpArea"].map(
                    (area) => (
                      <div key={area}>
                        <Label className="capitalize">{area}</Label>
                        <Input
                          type="number"
                          value={(formData as any)[area]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [area]: e.target.value,
                            })
                          }
                        />
                      </div>
                    )
                  )}
                  <div className="flex flex-col gap-2">
                  <Label className="capitalize">Total floors</Label>
                  <Input
                  
                    type="number"
                    placeholder="Total Floors"
                    value={formData.totalFloors}
                    onChange={(e) =>
                      setFormData({ ...formData, totalFloors: e.target.value })
                    }
                  />
                  </div>
                  <div className="flex flex-col gap-2">
                  <Label className="capitalize">Property on which floor</Label>
                  <Input
                    type="number"
                    placeholder="Property on Floor"
                    value={formData.propertyOnFloor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        propertyOnFloor: e.target.value,
                      })
                    }
                  />
                  </div>
                </div>
              )}

              {/* ✅ STEP 4: Furnishing & Rooms */}
              {step === 4 && (
                <div className="space-y-4">
                  <Label>Furnishing Status</Label>
                  <Select
                    value={formData.furnishingStatus}
                    onValueChange={(v) =>
                      setFormData({ ...formData, furnishingStatus: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Furnished">Furnished</SelectItem>
                      <SelectItem value="Semi-Furnished">
                        Semi-Furnished
                      </SelectItem>
                      <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Add Furnishings */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Furnishings</Label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleAddFurnishing}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    {formData.furnishings.map((f, i) => (
                      <div
                        key={i}
                        className="flex gap-2 items-center mb-2 border p-2 rounded-md"
                      >
                        <Input
                          placeholder="Item"
                          value={f.item}
                          onChange={(e) => {
                            const updated = [...formData.furnishings];
                            updated[i].item = e.target.value;
                            setFormData({ ...formData, furnishings: updated });
                          }}
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const updated = formData.furnishings.filter(
                              (_, idx) => idx !== i
                            );
                            setFormData({ ...formData, furnishings: updated });
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Other Rooms */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Other Rooms</Label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleAddOtherRoom}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    {formData.otherRooms.map((r, i) => (
                      <Input
                        key={i}
                        placeholder={`Room #${i + 1}`}
                        value={r}
                        onChange={(e) => {
                          const updated = [...formData.otherRooms];
                          updated[i] = e.target.value;
                          setFormData({ ...formData, otherRooms: updated });
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ✅ STEP 5: Pricing */}
              {step === 5 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Expected Price"
                    value={formData.expectedPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, expectedPrice: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Price per Sqft"
                    value={formData.pricePerSqft}
                    onChange={(e) =>
                      setFormData({ ...formData, pricePerSqft: e.target.value })
                    }
                  />
                
                </div>
              )}

              {/* ✅ STEP 6: Media & Description */}
              {step === 6 && (
                <div className="space-y-4">
                  <Label>Upload Images</Label>
                  <Input type="file" multiple onChange={handleImageChange} />
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {previewUrls.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt="preview"
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    ))}
                  </div>

                  <Input
                    placeholder="YouTube Link"
                    value={formData.youtubeLink}
                    onChange={(e) =>
                      setFormData({ ...formData, youtubeLink: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Instagram Link"
                    value={formData.instagramLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        instagramLink: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    placeholder="Property Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              {/* ✅ STEP 7: Amenities & Facing */}
              {step === 7 && (
                <div className="space-y-6">
                  <div>
                    <Label>Availability Status</Label>
                    <Select
                      value={formData.availabilityStatus}
                      onValueChange={(v) =>
                        setFormData({ ...formData, availabilityStatus: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                        <SelectItem value="Under Construction">
                          Under Construction
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Property Facing</Label>
                    <Select
                      value={formData.propertyFacing}
                      onValueChange={(v) =>
                        setFormData({ ...formData, propertyFacing: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Facing" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "North",
                          "South",
                          "East",
                          "West",
                          "North-East",
                          "North-West",
                          "South-East",
                          "South-West",
                        ].map((dir) => (
                          <SelectItem key={dir} value={dir}>
                            {dir}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Flooring Type</Label>
                    <Select
                      value={formData.flooringType}
                      onValueChange={(v) =>
                        setFormData({ ...formData, flooringType: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Flooring" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Marble",
                          "Vitrified Tiles",
                          "Wooden",
                          "Granite",
                          "Ceramic Tiles",
                          "Other",
                        ].map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Facing road width</Label>     <Input
                    placeholder="Facing Road Width (ft)"
                    value={formData.facingRoadWidth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        facingRoadWidth: e.target.value,
                      })
                    }
                  />
                  </div>
             

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Amenities</Label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleAddAmenity}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    {formData.amenities.map((a, i) => (
                      <Input
                        key={i}
                        placeholder={`Amenity #${i + 1}`}
                        value={a}
                        onChange={(e) => {
                          const updated = [...formData.amenities];
                          updated[i] = e.target.value;
                          setFormData({
                            ...formData,
                            amenities: updated,
                          });
                        }}
                      />
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Location Advantages</Label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleAddLocationAdv}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    {formData.locationAdvantages.map((a, i) => (
                      <Input
                        key={i}
                        placeholder={`Advantage #${i + 1}`}
                        value={a}
                        onChange={(e) => {
                          const updated = [...formData.locationAdvantages];
                          updated[i] = e.target.value;
                          setFormData({
                            ...formData,
                            locationAdvantages: updated,
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ✅ Navigation */}
              <div className="flex justify-between pt-6 border-t">
                {step > 1 ? (
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                ) : (
                  <div />
                )}
                {step < totalSteps ? (
                  <Button onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isPending}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    {isPending ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
