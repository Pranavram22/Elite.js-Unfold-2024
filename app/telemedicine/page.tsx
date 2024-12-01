"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Calendar, MessageSquare, Clock } from "lucide-react";

export default function Telemedicine() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Telemedicine</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="video">
                <TabsList className="mb-4">
                  <TabsTrigger value="video">
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </TabsTrigger>
                  <TabsTrigger value="chat">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedSlot === slot ? "default" : "outline"}
                        onClick={() => setSelectedSlot(slot)}
                        className="w-full"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-4" disabled={!selectedSlot}>
                    Book Appointment
                  </Button>
                </TabsContent>

                <TabsContent value="chat">
                  <div className="space-y-4">
                    <Input placeholder="Type your health concern..." />
                    <Button className="w-full">
                      Start Chat Consultation
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "Today, 2:00 PM", doctor: "Dr. Sarah Johnson", type: "Video" },
                { time: "Tomorrow, 10:00 AM", doctor: "Dr. Michael Chen", type: "Chat" },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{appointment.time}</div>
                    <div className="text-sm text-muted-foreground">{appointment.doctor}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Join {appointment.type}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}