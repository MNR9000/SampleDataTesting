import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, image, location, size, price, description, propertyType } = await req.json();

    if (!description || !location || !size || !price || !description) {
      return NextResponse.json(
        { message: 'Location, Size, Price, Description, PropertyTypedescription are required' },
        { status: 400 }
      );
    }

    const token = process.env.GITHUB_TOKEN;
    const repo = 'MNR9000/SampleDataTesting'; // your repo
    const filePath = 'data/listing.json';

    // Step 1: Get current content
    const fileResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'form-submitter',
        },
      }
    );

    if (!fileResponse.ok) {
      return NextResponse.json(
        { message: `Failed to fetch file from GitHub` },
        { status: 500 }
      );
    }

    const fileData = await fileResponse.json();
    const sha = fileData.sha;

    // Step 2: Decode existing content
    let decodedContent = [];

    try {
      if (fileData && fileData.content) {
        // Decode existing file
        decodedContent = JSON.parse(
          Buffer.from(fileData.content, "base64").toString("utf-8")
        );
      } else {
        // Only empty if the file truly doesn't exist
        decodedContent = [];
      }
    } catch (err) {
      console.error("Failed to parse existing JSON, starting fresh:", err);
      decodedContent = [];
    }

    // Ensure it's always an array
    if (!Array.isArray(decodedContent)) {
      decodedContent = [];
    }


    // Step 3: Append new entry
    const newEntry = {
      title,
      location,
      size,
      price,
      description,
      propertyType,
      image,
      timestamp: new Date().toISOString(),
    };
    decodedContent.push(newEntry);

    // Step 4: Encode new content
    const updatedContent = Buffer.from(
      JSON.stringify(decodedContent, null, 2)
    ).toString("base64");

    // Step 5: Commit updated content back to GitHub
    const commitResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add new entry: ${title}`,
          content: updatedContent,
          sha,
        }),
      }
    );

    if (!commitResponse.ok) {
      return NextResponse.json(
        { message: `Failed to commit changes to GitHub` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Submitted and committed successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}