<?php

namespace App\Http\Requests;

use App\Models\GuestInvitation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GuestStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:100'],
            'phone' => ['string', 'max:16','unique:guest_invitations,phone,'.$this->id.',id'],
            'email' => ['string', 'max:100','email','unique:guest_invitations,email,'.$this->id.',id'],
            'total_attendees' => ['numeric', 'min:1','max:5']
        ];
    }
}
