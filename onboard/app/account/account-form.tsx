"use client";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./avatar";
import { Database } from "../database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const [resume, setResume] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<string | null>(null);
  const [highestQualification, setHighestQualification] = useState<
    string | null
  >(null);
  const [areaOfInterest, setAreaOfInterest] = useState<string | null>(null);
  const [countryOfOrigin, setCountryOfOrigin] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [bestProject, setBestProject] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `
          full_name, 
          username, 
          website, 
          avatar_url, 
          resume, 
          experienceLevel, 
          highestQualification, 
          areaOfInterest, 
          countryOfOrigin, 
          phone, 
          bestProject
        `
        )
        .eq("id", user?.id)
        .single<{
          full_name: string;
          username: string;
          website: string;
          avatar_url: string;
          resume: string;
          experienceLevel: string;
          highestQualification: string;
          areaOfInterest: string;
          countryOfOrigin: string;
          phone: string;
          bestProject: string;
        }>();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setResume(data.resume);
        setExperienceLevel(data.experienceLevel);
        setHighestQualification(data.highestQualification);
        setAreaOfInterest(data.areaOfInterest);
        setCountryOfOrigin(data.countryOfOrigin);
        setPhone(data.phone);
        setBestProject(data.bestProject);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    website,
    avatar_url,
    fullname,
    resume,
    experienceLevel,
    highestQualification,
    areaOfInterest,
    countryOfOrigin,
    phone,
    bestProject,
  }: {
    website: string | null;
    avatar_url: string | null;
    fullname: string | null;
    resume: string | null;
    experienceLevel: string | null;
    highestQualification: string | null;
    areaOfInterest: string | null;
    countryOfOrigin: string | null;
    phone: string | null;
    bestProject: string | null;
  }) {
    try {
      setLoading(true);

      const userDataToUpdate: Record<string, string | null> = {
        full_name: fullname,
        website,
        avatar_url,
        resume,
        experienceLevel,
        highestQualification,
        areaOfInterest,
        countryOfOrigin,
        phone,
        bestProject,
        updated_at: new Date().toISOString(),
      };

      // Remove properties with null values
      Object.keys(userDataToUpdate).forEach((key) => {
        if (userDataToUpdate[key] === null) {
          delete userDataToUpdate[key];
        }
      });

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        ...userDataToUpdate,
      });

      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      {/* <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      /> */}
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>

      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="resume">Resume</label>
        <textarea
          id="resume"
          value={resume || ""}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="experienceLevel">Experience Level</label>
        <input
          id="experienceLevel"
          type="text"
          value={experienceLevel || ""}
          onChange={(e) => setExperienceLevel(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="highestQualification">Highest Qualification</label>
        <input
          id="highestQualification"
          type="text"
          value={highestQualification || ""}
          onChange={(e) => setHighestQualification(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="areaOfInterest">Area of Interest</label>
        <input
          id="areaOfInterest"
          type="text"
          value={areaOfInterest || ""}
          onChange={(e) => setAreaOfInterest(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="countryOfOrigin">Country of Origin</label>
        <input
          id="countryOfOrigin"
          type="text"
          value={countryOfOrigin || ""}
          onChange={(e) => setCountryOfOrigin(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bestProject">Your Best Project</label>
        <textarea
          id="bestProject"
          value={bestProject || ""}
          onChange={(e) => setBestProject(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({
              website,
              avatar_url,
              fullname,
              resume,
              experienceLevel,
              highestQualification,
              areaOfInterest,
              countryOfOrigin,
              phone,
              bestProject,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
