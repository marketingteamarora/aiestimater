"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { MapPin, Loader2 } from "lucide-react"
import { google } from "google-maps"

interface AddressComponents {
  streetNumber: string
  streetName: string
  city: string
  province: string
  postalCode: string
  fullAddress: string
}

interface AddressAutocompleteProps {
  onAddressSelect: (address: AddressComponents) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  initialValue?: string
  showIcon?: boolean
}

declare global {
  interface Window {
    google: typeof google
    initGoogleMaps: () => void
  }
}

let googleMapsPromise: Promise<void> | null = null

function loadGoogleMapsScript(): Promise<void> {
  if (googleMapsPromise) return googleMapsPromise

  googleMapsPromise = new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve()
      return
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      reject(new Error("Google Maps API key not found"))
      return
    }

    window.initGoogleMaps = () => {
      resolve()
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`
    script.async = true
    script.defer = true
    script.onerror = () => reject(new Error("Failed to load Google Maps"))
    document.head.appendChild(script)
  })

  return googleMapsPromise
}

export default function AddressAutocomplete({
  onAddressSelect,
  placeholder = "Enter your property address...",
  className = "",
  inputClassName = "",
  initialValue = "",
  showIcon = true,
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null)
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null)

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        setIsGoogleLoaded(true)
        autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService()
        const dummyElement = document.createElement("div")
        placesServiceRef.current = new window.google.maps.places.PlacesService(dummyElement)
        sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken()
      })
      .catch((error) => {
        console.error("Failed to load Google Maps:", error)
      })
  }, [])

  useEffect(() => {
    setInputValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const searchAddress = useCallback(
    async (input: string) => {
      if (!input || input.length < 3 || !autocompleteServiceRef.current || !isGoogleLoaded) {
        setPredictions([])
        return
      }

      setIsLoading(true)

      try {
        const request: google.maps.places.AutocompletionRequest = {
          input,
          componentRestrictions: { country: "ca" }, // Canada only
          types: ["address"],
          sessionToken: sessionTokenRef.current!,
        }

        autocompleteServiceRef.current.getPlacePredictions(request, (results, status) => {
          setIsLoading(false)
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            setPredictions(results)
            setShowDropdown(true)
          } else {
            setPredictions([])
          }
        })
      } catch (error) {
        console.error("Error fetching predictions:", error)
        setIsLoading(false)
        setPredictions([])
      }
    },
    [isGoogleLoaded]
  )

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchAddress(inputValue)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [inputValue, searchAddress])

  const handleSelectPrediction = (prediction: google.maps.places.AutocompletePrediction) => {
    if (!placesServiceRef.current) return

    setShowDropdown(false)
    setInputValue(prediction.description)

    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: prediction.place_id,
      fields: ["address_components", "formatted_address"],
      sessionToken: sessionTokenRef.current!,
    }

    placesServiceRef.current.getDetails(request, (place, status) => {
      // Create a new session token for the next search
      sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken()

      if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.address_components) {
        const components = place.address_components
        const addressData: AddressComponents = {
          streetNumber: "",
          streetName: "",
          city: "",
          province: "",
          postalCode: "",
          fullAddress: place.formatted_address || prediction.description,
        }

        for (const component of components) {
          const types = component.types

          if (types.includes("street_number")) {
            addressData.streetNumber = component.long_name
          } else if (types.includes("route")) {
            addressData.streetName = component.long_name
          } else if (types.includes("locality")) {
            addressData.city = component.long_name
          } else if (types.includes("administrative_area_level_1")) {
            addressData.province = component.short_name
          } else if (types.includes("postal_code")) {
            addressData.postalCode = component.long_name
          }
        }

        onAddressSelect(addressData)
      }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    if (!e.target.value) {
      setPredictions([])
      setShowDropdown(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        {showIcon && <MapPin className="absolute left-3 w-5 h-5 text-muted-foreground z-10" />}
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => predictions.length > 0 && setShowDropdown(true)}
          className={`${showIcon ? "pl-10" : ""} ${inputClassName}`}
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {showDropdown && predictions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              type="button"
              onClick={() => handleSelectPrediction(prediction)}
              className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-start gap-3 border-b border-border/50 last:border-0"
            >
              <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {prediction.structured_formatting.main_text}
                </p>
                <p className="text-xs text-muted-foreground">
                  {prediction.structured_formatting.secondary_text}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
