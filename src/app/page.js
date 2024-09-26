'use client'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Home() {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success('Query received successfully. We will get back to you soon. Thanks!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setFormData({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        message: '',
      });
      setAgreed(false);
    } else {
      toast.error('Failed to send query. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="px-6 py-24 sm:py-32 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white" >Hello Welcome to MailEnquiry</h1>
        <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
          This page is exclusively for fit-out enquiry service purposes:
        </p>
        <h2 className="text-2xl mt-4 font-semibold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
          Please feel free to ask anything
        </h2>
      </div>

      <form
        className="mx-auto mt-16 max-w-xl sm:mt-20 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="mt-2.5">
            <Input
              type="text"
              id="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            />
          </div>
          <div className="mt-2.5">
            <Input
              type="text"
              id="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              id="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              id="message"
              placeholder="Type Your Query Here..."
              value={formData.message}
              onChange={handleChange}
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            />
          </div>
          <Switch.Group as="div">
            <div>
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-blue-500' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                <span className="sr-only">Agree to our policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label as="span" className="ml-3 text-sm">
              <span className="font-medium text-gray-900 dark:text-white">
                I agree to our privacy policy.
              </span>
            </Switch.Label>
          </Switch.Group>
          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={!agreed}
              className="w-full py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out"
            >
              Send Message
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
