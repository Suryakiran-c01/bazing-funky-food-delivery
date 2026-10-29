import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Plus, Check, X, Building, Home, Briefcase } from 'lucide-react';
import { DeliveryAddress } from '../types/food';

interface AddressPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddressPickerModal: React.FC<AddressPickerModalProps> = ({ isOpen, onClose }) => {
  const { addresses, selectedAddress, setSelectedAddress, addAddress } = useApp();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLabel, setNewLabel] = useState<DeliveryAddress['label']>('Home');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('Metro City, MC 94016');
  const [newLandmark, setNewLandmark] = useState('');

  if (!isOpen) return null;

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet) return;
    addAddress({
      label: newLabel,
      street: newStreet,
      city: newCity,
      landmark: newLandmark || undefined,
    });
    setIsAddingNew(false);
    setNewStreet('');
    setNewLandmark('');
  };

  const getIcon = (label: string) => {
    switch (label) {
      case 'Campus Dorm':
        return <Building className="w-5 h-5 text-[#FF6B35]" />;
      case 'Home':
        return <Home className="w-5 h-5 text-[#FFD93D]" />;
      case 'Work':
        return <Briefcase className="w-5 h-5 text-[#FF4F9A]" />;
      default:
        return <MapPin className="w-5 h-5 text-[#B8F34A]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border-4 border-[#25113D] rounded-3xl shadow-[8px_8px_0px_#25113D] overflow-hidden p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[#FFF8E7] border-2 border-[#25113D] rounded-full flex items-center justify-center text-[#25113D] hover:bg-[#FF4F9A] hover:text-white"
          aria-label="Close address picker"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#FFD93D] border-2 border-[#25113D] flex items-center justify-center text-lg">
            📍
          </div>
          <div>
            <h3 className="font-display font-black text-xl text-[#25113D]">
              Choose Delivery Location
            </h3>
            <p className="text-xs text-gray-500">Where should we zoom your food to?</p>
          </div>
        </div>

        {!isAddingNew ? (
          <div>
            <div className="space-y-3 mb-5 max-h-72 overflow-y-auto pr-1">
              {addresses.map((addr) => {
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => {
                      setSelectedAddress(addr);
                      onClose();
                    }}
                    className={`p-3.5 rounded-2xl border-2 border-[#25113D] cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#FFF8E7] shadow-[4px_4px_0px_#25113D]'
                        : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_#25113D]'
                    }`}
                  >
                    <div className="p-2 bg-white rounded-xl border-2 border-[#25113D] shadow-[2px_2px_0px_#25113D]">
                      {getIcon(addr.label)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-[#25113D]">
                          {addr.label}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-display font-black bg-[#B8F34A] text-[#25113D] px-2 py-0.5 rounded-full border border-[#25113D]">
                            SELECTED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">{addr.street}</p>
                      {addr.landmark && (
                        <p className="text-[11px] text-[#FF6B35] font-medium mt-0.5">
                          Landmark: {addr.landmark}
                        </p>
                      )}
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-1" />}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsAddingNew(true)}
              className="w-full py-3 bg-[#FFD93D] text-[#25113D] font-display font-bold rounded-2xl pop-btn flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Delivery Address</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleAddNew} className="space-y-3.5">
            <div>
              <label className="block text-xs font-display font-bold uppercase text-[#25113D] mb-1">
                Address Tag
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Campus Dorm', 'Home', 'Work'] as const).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setNewLabel(tag)}
                    className={`py-2 text-xs font-display font-bold rounded-xl border-2 border-[#25113D] ${
                      newLabel === tag ? 'bg-[#FF6B35] text-white shadow-[2px_2px_0px_#25113D]' : 'bg-gray-50 text-[#25113D]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase text-[#25113D] mb-1">
                Street & Apartment / Room #
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Block C, Room 204, East Hostel"
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#25113D] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
            </div>

            <div>
              <label className="block text-xs font-display font-bold uppercase text-[#25113D] mb-1">
                Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Near Cafeteria Gate 2"
                value={newLandmark}
                onChange={(e) => setNewLandmark(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#25113D] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="flex-1 py-2.5 border-2 border-[#25113D] rounded-xl font-display font-bold text-sm bg-gray-100 hover:bg-gray-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#FF6B35] text-white font-display font-bold text-sm rounded-xl pop-btn"
              >
                Save & Select
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
