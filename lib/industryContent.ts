import type { Conversation } from '@/components/Conversation';

export interface IndustryPageContent {
  title: string;
  intro: string;
  example: Conversation;
  heading: string;
  uses: [string, string][];
}

export const industryContent: Record<string, IndustryPageContent> = {
  "property-management": {
    "title": "Answer leasing calls and after-hours maintenance requests.",
    "intro": "Give renters a way to book a showing and residents a way to report a repair. You decide which calls reach your on-call team.",
    "example": {
      "channel": "Phone call",
      "time": "11:12 PM",
      "business": "Ridgeview Apartments",
      "who": "Resident",
      "lines": [
        "There’s water coming out from under my sink.",
        "I can alert the on-call team. Which building and unit are you in?",
        "Building B, unit 204. It’s still leaking."
      ],
      "result": "Maintenance alert",
      "detail": "Active leak · Building B, unit 204",
      "next": "Sent to the property’s on-call contact."
    },
    "heading": "What your leasing office can hand off",
    "uses": [
      [
        "Showing requests",
        "Answer questions about a listing and book a tour in an available time slot."
      ],
      [
        "Maintenance calls",
        "Collect the unit, callback number, and issue. Route urgent reports under your property’s rules."
      ],
      [
        "Resident questions",
        "Share approved answers about parking, pets, move-in dates, and the rent portal."
      ]
    ]
  },
  "roofers": {
    "title": "Book roof inspections while your crew is on the roof.",
    "intro": "Answer calls after a storm and chat with homeowners looking for an estimate. Collect the address, the roof concern, and a time your estimator can visit.",
    "example": {
      "channel": "Website chat",
      "time": "7:42 PM",
      "business": "Hawkeye Roofing",
      "who": "Homeowner",
      "lines": [
        "We had hail last night. Can someone look at our roof?",
        "Yes. We have an inspection opening Friday at 10. Does that work?",
        "That works. The house is on Oak Street."
      ],
      "result": "Inspection booked",
      "detail": "Friday, 10:00 AM · Oak Street",
      "next": "The inspection and job notes go on your calendar."
    },
    "heading": "What your roofing office can hand off",
    "uses": [
      [
        "Storm inquiries",
        "Ask about the damage and property location so your estimator has the facts before calling back."
      ],
      [
        "Inspection bookings",
        "Offer available times on your inspection calendar and collect the homeowner’s contact details."
      ],
      [
        "Active leaks",
        "Use your escalation rules to route reported leaks to the person covering urgent calls."
      ]
    ]
  },
  "hvac": {
    "title": "Book HVAC service calls while your technicians are out.",
    "intro": "Answer no-heat calls, cooling questions, and tune-up requests. Give dispatch the equipment type, service address, and reason for the visit.",
    "example": {
      "channel": "Phone call",
      "time": "7:15 AM",
      "business": "Prairie Heating & Air",
      "who": "Caller",
      "lines": [
        "Our furnace stopped heating overnight.",
        "What ZIP code are you in, and what number should dispatch call?",
        "52240. Please call me before sending someone."
      ],
      "result": "Dispatch callback requested",
      "detail": "No heat · Furnace · ZIP 52240",
      "next": "Dispatch receives the callback details and service request."
    },
    "heading": "What your dispatch team can hand off",
    "uses": [
      [
        "Service requests",
        "Collect system type, symptoms, and service area before the technician calls back."
      ],
      [
        "Seasonal tune-ups",
        "Offer open maintenance slots on your calendar and record the equipment to be serviced."
      ],
      [
        "Replacement estimates",
        "Capture the property type and preferred estimate time for your comfort advisor."
      ]
    ]
  },
  "plumbing": {
    "title": "Answer plumbing calls while you finish the job.",
    "intro": "Take repair requests by phone or website chat. Collect the issue, address, and callback number so your dispatcher knows who needs a visit.",
    "example": {
      "channel": "Phone call",
      "time": "6:18 PM",
      "business": "Northside Plumbing",
      "who": "Caller",
      "lines": [
        "The water heater is leaking. Can someone call me back?",
        "What’s the service address, and where can the plumber reach you?",
        "It’s on Linn Street. This number is best."
      ],
      "result": "Repair callback requested",
      "detail": "Leaking water heater · Linn Street",
      "next": "The request goes to your designated contact."
    },
    "heading": "What your plumbing office can hand off",
    "uses": [
      [
        "Repair intake",
        "Gather the fixture, reported issue, service address, and callback details."
      ],
      [
        "Scheduled work",
        "Book routine service or an estimate using the time slots your office makes available."
      ],
      [
        "After-hours calls",
        "Route urgent reports to your on-call plumber under the rules you approve."
      ]
    ]
  },
  "electrical": {
    "title": "Turn electrical inquiries into scheduled estimates.",
    "intro": "Answer questions about installations, upgrades, and service areas while electricians are on site. Get the project details to the person preparing the quote.",
    "example": {
      "channel": "Website chat",
      "time": "8:24 PM",
      "business": "Summit Electric",
      "who": "Homeowner",
      "lines": [
        "Do you install EV chargers in garages?",
        "Yes. Is it an attached garage, and when would you like an estimate?",
        "Attached. Thursday afternoon would work."
      ],
      "result": "Estimate requested",
      "detail": "EV charger · Attached garage",
      "next": "Your estimator receives the request and preferred visit time."
    },
    "heading": "What your electrical office can hand off",
    "uses": [
      [
        "Installation estimates",
        "Ask about the project, property, and service area before an estimator follows up."
      ],
      [
        "Service calls",
        "Gather contact details and the customer’s description for a licensed electrician."
      ],
      [
        "Site visits",
        "Offer available estimate slots and record access instructions for your crew."
      ]
    ]
  },
  "auto-repair": {
    "title": "Book service appointments while your shop is busy.",
    "intro": "Answer calls and website questions about oil changes, inspections, and repairs. Give your service advisor the vehicle details before they call back.",
    "example": {
      "channel": "Phone call",
      "time": "7:36 AM",
      "business": "River City Auto",
      "who": "Driver",
      "lines": [
        "Can I bring my car in to have the brakes checked?",
        "What do you drive, and which day works for a drop-off?",
        "A 2018 Accord. Wednesday morning works."
      ],
      "result": "Service request captured",
      "detail": "Brake inspection · 2018 Honda Accord",
      "next": "The advisor receives the preferred drop-off time."
    },
    "heading": "What your service advisors can hand off",
    "uses": [
      [
        "Repair inquiries",
        "Collect the year, make, model, and concern so your advisor can plan the next step."
      ],
      [
        "Maintenance bookings",
        "Offer available slots for routine work such as oil changes or inspections."
      ],
      [
        "Shop questions",
        "Answer from your published hours, location, drop-off instructions, and services."
      ]
    ]
  },
  "dental": {
    "title": "Answer new-patient inquiries while your team is chairside.",
    "intro": "Give prospective patients a way to ask about office hours, locations, and scheduling. Send appointment requests to the front desk for confirmation.",
    "example": {
      "channel": "Website chat",
      "time": "6:09 PM",
      "business": "Park Street Dental",
      "who": "Visitor",
      "lines": [
        "Are you taking new patients for cleanings?",
        "Yes. What day would you like the front desk to call about an appointment?",
        "Friday morning would be great."
      ],
      "result": "Front desk callback requested",
      "detail": "New patient · Cleaning inquiry",
      "next": "The office receives the requested callback time."
    },
    "heading": "What your dental front desk can hand off",
    "uses": [
      [
        "New-patient calls",
        "Collect a callback request and the best time for the office to reach the caller."
      ],
      [
        "Office questions",
        "Share published hours, directions, parking, and your new-patient process."
      ],
      [
        "Appointment requests",
        "Capture the preferred visit time for staff confirmation. Route clinical questions to your team."
      ]
    ]
  }
};
